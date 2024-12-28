import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../../../config/supabase';
import { toast } from "sonner";

export const useReportMetrics = (filters) => {
  return useQuery({
    queryKey: ['report-metrics', filters],
    queryFn: async () => {
      try {
        console.log('Verificando sessão do usuário...');
        const { data: session } = await supabase.auth.getSession();
        console.log('Sessão atual:', {
          userId: session?.user?.id,
          role: session?.user?.role,
          email: session?.user?.email
        });

        console.log('Consultando métricas com filtros:', filters);

        // Ajusta as datas para o formato correto
        const startDate = filters.startDate ? new Date(filters.startDate) : null;
        const endDate = filters.endDate ? new Date(filters.endDate) : null;

        console.log('Construindo query base...');
        let query = supabase
          .from('vw_uso_voucher_detalhado')
          .select('*');

        console.log('Aplicando filtros na query...');
        
        if (filters.company && filters.company !== 'all') {
          console.log('Filtrando por empresa:', filters.company);
          query = query.eq('empresa_id', filters.company);
        }
        
        if (startDate) {
          console.log('Filtrando por data início:', startDate.toISOString());
          startDate.setUTCHours(0, 0, 0, 0);
          query = query.gte('data_uso', startDate.toISOString());
        }
        
        if (endDate) {
          console.log('Filtrando por data fim:', endDate.toISOString());
          endDate.setUTCHours(23, 59, 59, 999);
          query = query.lte('data_uso', endDate.toISOString());
        }

        if (filters.shift && filters.shift !== 'all') {
          console.log('Filtrando por turno:', filters.shift);
          query = query.eq('turno', filters.shift);
        }

        if (filters.sector && filters.sector !== 'all') {
          console.log('Filtrando por setor:', filters.sector);
          query = query.eq('setor_id', filters.sector);
        }

        if (filters.mealType && filters.mealType !== 'all') {
          console.log('Filtrando por tipo refeição:', filters.mealType);
          query = query.eq('tipo_refeicao', filters.mealType);
        }

        console.log('Executando query...');
        const { data: usageData, error, status, statusText } = await query;

        if (error) {
          console.error('Erro detalhado na consulta:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code,
            status: status,
            statusText: statusText
          });
          toast.error('Erro ao carregar dados do relatório');
          throw error;
        }

        console.log('Dados brutos retornados:', {
          totalRegistros: usageData?.length || 0,
          primeiroRegistro: usageData?.[0],
          ultimoRegistro: usageData?.[usageData?.length - 1]
        });

        // Se não houver dados, retornar objeto com valores zerados
        if (!usageData || usageData.length === 0) {
          console.log('Nenhum dado encontrado, retornando valores zerados');
          return {
            totalCost: 0,
            averageCost: 0,
            regularVouchers: 0,
            disposableVouchers: 0,
            byCompany: {},
            byShift: {},
            byMealType: {},
            data: []
          };
        }

        // Calcular métricas
        console.log('Calculando métricas...');
        const totalCost = usageData.reduce((sum, item) => 
          sum + (parseFloat(item.valor) || 0), 0);
        
        const averageCost = usageData.length > 0 ? totalCost / usageData.length : 0;

        // Agrupar por empresa
        const byCompany = usageData.reduce((acc, curr) => {
          const empresa = curr.nome_empresa || 'Não especificado';
          acc[empresa] = (acc[empresa] || 0) + 1;
          return acc;
        }, {});

        // Agrupar por turno
        const byShift = usageData.reduce((acc, curr) => {
          const turno = curr.turno || 'Não especificado';
          acc[turno] = (acc[turno] || 0) + 1;
          return acc;
        }, {});

        // Agrupar por tipo de refeição
        const byMealType = usageData.reduce((acc, curr) => {
          const tipo = curr.tipo_refeicao || 'Não especificado';
          acc[tipo] = (acc[tipo] || 0) + 1;
          return acc;
        }, {});

        console.log('Métricas calculadas:', {
          totalRegistros: usageData.length,
          custoTotal: totalCost,
          custoMedio: averageCost,
          empresas: Object.keys(byCompany).length,
          turnos: Object.keys(byShift).length,
          tiposRefeicao: Object.keys(byMealType).length
        });

        return {
          totalCost,
          averageCost,
          regularVouchers: usageData.length,
          disposableVouchers: 0,
          byCompany,
          byShift,
          byMealType,
          data: usageData
        };
      } catch (error) {
        console.error('Erro detalhado na consulta:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
          cause: error.cause
        });
        toast.error('Erro ao carregar dados do relatório');
        throw error;
      }
    },
    retry: 1,
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
};