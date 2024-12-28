import { useState } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/config/supabase";

export const useTurnosActions = () => {
  const queryClient = useQueryClient();
  const [submittingTurnoId, setSubmittingTurnoId] = useState(null);

  const createTurnoMutation = useMutation({
    mutationFn: async (novoTurno) => {
      console.log('[Creating Turno]', novoTurno);
      const { data, error } = await supabase
        .from('turnos')
        .insert([{
          tipo_turno: novoTurno.tipo_turno,
          horario_inicio: novoTurno.horario_inicio,
          horario_fim: novoTurno.horario_fim,
          ativo: novoTurno.ativo
        }])
        .select('*')
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['turnos']);
      toast.success("Turno criado com sucesso!");
    },
    onError: (error) => {
      console.error('[Create Turno Error]', error);
      toast.error(`Erro ao criar turno: ${error.message}`);
    }
  });

  const updateTurnosMutation = useMutation({
    mutationFn: async (updatedTurno) => {
      console.log('[Updating Turno]', updatedTurno);
      const { data, error } = await supabase
        .from('turnos')
        .update({
          horario_inicio: updatedTurno.horario_inicio,
          horario_fim: updatedTurno.horario_fim,
          ativo: updatedTurno.ativo,
          updated_at: new Date().toISOString()
        })
        .eq('id', updatedTurno.id)
        .select('*')
        .single();

      if (error) throw error;
      return data;
    },
    onMutate: (variables) => {
      setSubmittingTurnoId(variables.id);
    },
    onSettled: () => {
      setSubmittingTurnoId(null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['turnos']);
      toast.success("Horário do turno atualizado com sucesso!");
    },
    onError: (error) => {
      console.error('[Update Turno Error]', error);
      toast.error(`Erro ao atualizar turno: ${error.message}`);
    }
  });

  const handleTurnoChange = (id, field, value) => {
    if (submittingTurnoId === id) {
      toast.warning("Aguarde, processando alteração anterior...");
      return;
    }

    const turno = queryClient.getQueryData(['turnos'])?.find(t => t.id === id);
    if (!turno) return;

    const updatedTurno = {
      ...turno,
      [field]: value
    };

    updateTurnosMutation.mutate(updatedTurno);
  };

  const handleCreateTurno = (novoTurno) => {
    createTurnoMutation.mutate(novoTurno);
  };

  return {
    handleTurnoChange,
    handleCreateTurno,
    submittingTurnoId
  };
};