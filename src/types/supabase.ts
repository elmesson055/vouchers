export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      clientes: {
        Row: {
          address: string | null
          cep: string | null
          city: string | null
          complement: string | null
          contact: string | null
          created_at: string | null
          district: string | null
          fantasy_name: string | null
          id: string
          mobile: string | null
          name: string
          number: string | null
          phone: string | null
          state: string | null
          status: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          cep?: string | null
          city?: string | null
          complement?: string | null
          contact?: string | null
          created_at?: string | null
          district?: string | null
          fantasy_name?: string | null
          id?: string
          mobile?: string | null
          name: string
          number?: string | null
          phone?: string | null
          state?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          cep?: string | null
          city?: string | null
          complement?: string | null
          contact?: string | null
          created_at?: string | null
          district?: string | null
          fantasy_name?: string | null
          id?: string
          mobile?: string | null
          name?: string
          number?: string | null
          phone?: string | null
          state?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      destinatarios: {
        Row: {
          bairro: string | null
          cep: string | null
          cnpj: string
          codigo_municipio: string | null
          codigo_pais: string | null
          complemento: string | null
          created_at: string | null
          endereco: string | null
          id: string
          indicador_ie: string | null
          inscricao_estadual: string | null
          municipio: string | null
          numero: string | null
          pais: string | null
          razao_social: string
          telefone: string | null
          uf: string | null
          updated_at: string | null
        }
        Insert: {
          bairro?: string | null
          cep?: string | null
          cnpj: string
          codigo_municipio?: string | null
          codigo_pais?: string | null
          complemento?: string | null
          created_at?: string | null
          endereco?: string | null
          id?: string
          indicador_ie?: string | null
          inscricao_estadual?: string | null
          municipio?: string | null
          numero?: string | null
          pais?: string | null
          razao_social: string
          telefone?: string | null
          uf?: string | null
          updated_at?: string | null
        }
        Update: {
          bairro?: string | null
          cep?: string | null
          cnpj?: string
          codigo_municipio?: string | null
          codigo_pais?: string | null
          complemento?: string | null
          created_at?: string | null
          endereco?: string | null
          id?: string
          indicador_ie?: string | null
          inscricao_estadual?: string | null
          municipio?: string | null
          numero?: string | null
          pais?: string | null
          razao_social?: string
          telefone?: string | null
          uf?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      embarcadores: {
        Row: {
          city: string | null
          created_at: string | null
          fantasy_name: string | null
          id: string
          mobile: string | null
          name: string
          phone: string | null
          state: string | null
          status: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          fantasy_name?: string | null
          id?: string
          mobile?: string | null
          name: string
          phone?: string | null
          state?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          fantasy_name?: string | null
          id?: string
          mobile?: string | null
          name?: string
          phone?: string | null
          state?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      emitentes: {
        Row: {
          bairro: string | null
          cep: string | null
          cnae: string | null
          cnpj: string
          codigo_municipio: string | null
          codigo_pais: string | null
          complemento: string | null
          created_at: string | null
          endereco: string | null
          id: string
          inscricao_estadual: string | null
          inscricao_municipal: string | null
          municipio: string | null
          numero: string | null
          pais: string | null
          razao_social: string
          regime_tributario: string | null
          telefone: string | null
          uf: string | null
          updated_at: string | null
        }
        Insert: {
          bairro?: string | null
          cep?: string | null
          cnae?: string | null
          cnpj: string
          codigo_municipio?: string | null
          codigo_pais?: string | null
          complemento?: string | null
          created_at?: string | null
          endereco?: string | null
          id?: string
          inscricao_estadual?: string | null
          inscricao_municipal?: string | null
          municipio?: string | null
          numero?: string | null
          pais?: string | null
          razao_social: string
          regime_tributario?: string | null
          telefone?: string | null
          uf?: string | null
          updated_at?: string | null
        }
        Update: {
          bairro?: string | null
          cep?: string | null
          cnae?: string | null
          cnpj?: string
          codigo_municipio?: string | null
          codigo_pais?: string | null
          complemento?: string | null
          created_at?: string | null
          endereco?: string | null
          id?: string
          inscricao_estadual?: string | null
          inscricao_municipal?: string | null
          municipio?: string | null
          numero?: string | null
          pais?: string | null
          razao_social?: string
          regime_tributario?: string | null
          telefone?: string | null
          uf?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      motivos_movimentacao: {
        Row: {
          created_at: string | null
          descricao: string
          id: string
          tipo_movimento: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          descricao: string
          id?: string
          tipo_movimento: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          descricao?: string
          id?: string
          tipo_movimento?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      motoristas: {
        Row: {
          created_at: string | null
          id: string
          nome: string
          placa: string
          status: string | null
          tipo_veiculo: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          nome: string
          placa: string
          status?: string | null
          tipo_veiculo: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          nome?: string
          placa?: string
          status?: string | null
          tipo_veiculo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      movimentacoes: {
        Row: {
          cliente_id: string | null
          created_at: string | null
          data_movimento: string | null
          embarcador_id: string | null
          estado_conservacao: string | null
          id: string
          local_destino: string | null
          local_origem: string | null
          motivo: string | null
          nf_movimento: string | null
          nf_palete: string | null
          nfe_id: string | null
          num_movimento: string | null
          num_vale: string | null
          observacoes: string | null
          palete_id: string | null
          quantidade: number
          status: string | null
          tipo_movimento: string | null
          transportadora_id: string | null
          updated_at: string | null
          usuario_id: string | null
        }
        Insert: {
          cliente_id?: string | null
          created_at?: string | null
          data_movimento?: string | null
          embarcador_id?: string | null
          estado_conservacao?: string | null
          id?: string
          local_destino?: string | null
          local_origem?: string | null
          motivo?: string | null
          nf_movimento?: string | null
          nf_palete?: string | null
          nfe_id?: string | null
          num_movimento?: string | null
          num_vale?: string | null
          observacoes?: string | null
          palete_id?: string | null
          quantidade: number
          status?: string | null
          tipo_movimento?: string | null
          transportadora_id?: string | null
          updated_at?: string | null
          usuario_id?: string | null
        }
        Update: {
          cliente_id?: string | null
          created_at?: string | null
          data_movimento?: string | null
          embarcador_id?: string | null
          estado_conservacao?: string | null
          id?: string
          local_destino?: string | null
          local_origem?: string | null
          motivo?: string | null
          nf_movimento?: string | null
          nf_palete?: string | null
          nfe_id?: string | null
          num_movimento?: string | null
          num_vale?: string | null
          observacoes?: string | null
          palete_id?: string | null
          quantidade?: number
          status?: string | null
          tipo_movimento?: string | null
          transportadora_id?: string | null
          updated_at?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "movimentacoes_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_embarcador_id_fkey"
            columns: ["embarcador_id"]
            isOneToOne: false
            referencedRelation: "embarcadores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_nfe_id_fkey"
            columns: ["nfe_id"]
            isOneToOne: false
            referencedRelation: "nfe"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_palete_id_fkey"
            columns: ["palete_id"]
            isOneToOne: false
            referencedRelation: "pallets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_transportadora_id_fkey"
            columns: ["transportadora_id"]
            isOneToOne: false
            referencedRelation: "transportadoras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movimentacoes_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      nfe: {
        Row: {
          chave_nfe: string
          consumidor_final: string | null
          created_at: string | null
          data_emissao: string | null
          data_saida: string | null
          destinatario_id: string
          emitente_id: string
          finalidade: string | null
          forma_pagamento: string | null
          id: string
          informacoes_complementares: string | null
          natureza_operacao: string | null
          numero: string
          presenca_comprador: string | null
          processo_emissao: string | null
          serie: string
          status: string | null
          tipo_ambiente: string | null
          tipo_emissao: string | null
          tipo_impressao: string | null
          tipo_operacao: string | null
          updated_at: string | null
          valor_total: number | null
          versao_processo: string | null
          xml_content: string | null
        }
        Insert: {
          chave_nfe: string
          consumidor_final?: string | null
          created_at?: string | null
          data_emissao?: string | null
          data_saida?: string | null
          destinatario_id: string
          emitente_id: string
          finalidade?: string | null
          forma_pagamento?: string | null
          id?: string
          informacoes_complementares?: string | null
          natureza_operacao?: string | null
          numero: string
          presenca_comprador?: string | null
          processo_emissao?: string | null
          serie: string
          status?: string | null
          tipo_ambiente?: string | null
          tipo_emissao?: string | null
          tipo_impressao?: string | null
          tipo_operacao?: string | null
          updated_at?: string | null
          valor_total?: number | null
          versao_processo?: string | null
          xml_content?: string | null
        }
        Update: {
          chave_nfe?: string
          consumidor_final?: string | null
          created_at?: string | null
          data_emissao?: string | null
          data_saida?: string | null
          destinatario_id?: string
          emitente_id?: string
          finalidade?: string | null
          forma_pagamento?: string | null
          id?: string
          informacoes_complementares?: string | null
          natureza_operacao?: string | null
          numero?: string
          presenca_comprador?: string | null
          processo_emissao?: string | null
          serie?: string
          status?: string | null
          tipo_ambiente?: string | null
          tipo_emissao?: string | null
          tipo_impressao?: string | null
          tipo_operacao?: string | null
          updated_at?: string | null
          valor_total?: number | null
          versao_processo?: string | null
          xml_content?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nfe_destinatario_id_fkey"
            columns: ["destinatario_id"]
            isOneToOne: false
            referencedRelation: "destinatarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nfe_emitente_id_fkey"
            columns: ["emitente_id"]
            isOneToOne: false
            referencedRelation: "emitentes"
            referencedColumns: ["id"]
          },
        ]
      }
      nfe_itens: {
        Row: {
          aliquota_cofins: number | null
          aliquota_icms: number | null
          aliquota_pis: number | null
          base_calculo_cofins: number | null
          base_calculo_icms: number | null
          base_calculo_pis: number | null
          cfop: string | null
          codigo_ean: string | null
          codigo_produto: string
          created_at: string | null
          cst_cofins: string | null
          cst_icms: string | null
          cst_pis: string | null
          descricao: string
          id: string
          ncm: string | null
          nfe_id: string | null
          numero_item: number
          origem_mercadoria: string | null
          quantidade_comercial: number | null
          quantidade_tributavel: number | null
          unidade_comercial: string | null
          unidade_tributavel: string | null
          updated_at: string | null
          valor_cofins: number | null
          valor_icms: number | null
          valor_pis: number | null
          valor_total: number | null
          valor_unitario_comercial: number | null
          valor_unitario_tributavel: number | null
        }
        Insert: {
          aliquota_cofins?: number | null
          aliquota_icms?: number | null
          aliquota_pis?: number | null
          base_calculo_cofins?: number | null
          base_calculo_icms?: number | null
          base_calculo_pis?: number | null
          cfop?: string | null
          codigo_ean?: string | null
          codigo_produto: string
          created_at?: string | null
          cst_cofins?: string | null
          cst_icms?: string | null
          cst_pis?: string | null
          descricao: string
          id?: string
          ncm?: string | null
          nfe_id?: string | null
          numero_item: number
          origem_mercadoria?: string | null
          quantidade_comercial?: number | null
          quantidade_tributavel?: number | null
          unidade_comercial?: string | null
          unidade_tributavel?: string | null
          updated_at?: string | null
          valor_cofins?: number | null
          valor_icms?: number | null
          valor_pis?: number | null
          valor_total?: number | null
          valor_unitario_comercial?: number | null
          valor_unitario_tributavel?: number | null
        }
        Update: {
          aliquota_cofins?: number | null
          aliquota_icms?: number | null
          aliquota_pis?: number | null
          base_calculo_cofins?: number | null
          base_calculo_icms?: number | null
          base_calculo_pis?: number | null
          cfop?: string | null
          codigo_ean?: string | null
          codigo_produto?: string
          created_at?: string | null
          cst_cofins?: string | null
          cst_icms?: string | null
          cst_pis?: string | null
          descricao?: string
          id?: string
          ncm?: string | null
          nfe_id?: string | null
          numero_item?: number
          origem_mercadoria?: string | null
          quantidade_comercial?: number | null
          quantidade_tributavel?: number | null
          unidade_comercial?: string | null
          unidade_tributavel?: string | null
          updated_at?: string | null
          valor_cofins?: number | null
          valor_icms?: number | null
          valor_pis?: number | null
          valor_total?: number | null
          valor_unitario_comercial?: number | null
          valor_unitario_tributavel?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "nfe_itens_nfe_id_fkey"
            columns: ["nfe_id"]
            isOneToOne: false
            referencedRelation: "nfe"
            referencedColumns: ["id"]
          },
        ]
      }
      nfe_totais: {
        Row: {
          base_calculo_icms: number | null
          base_calculo_icms_st: number | null
          created_at: string | null
          id: string
          nfe_id: string | null
          updated_at: string | null
          valor_cofins: number | null
          valor_desconto: number | null
          valor_frete: number | null
          valor_icms: number | null
          valor_icms_desonerado: number | null
          valor_icms_st: number | null
          valor_ii: number | null
          valor_ipi: number | null
          valor_outros: number | null
          valor_pis: number | null
          valor_produtos: number | null
          valor_seguro: number | null
          valor_total: number | null
        }
        Insert: {
          base_calculo_icms?: number | null
          base_calculo_icms_st?: number | null
          created_at?: string | null
          id?: string
          nfe_id?: string | null
          updated_at?: string | null
          valor_cofins?: number | null
          valor_desconto?: number | null
          valor_frete?: number | null
          valor_icms?: number | null
          valor_icms_desonerado?: number | null
          valor_icms_st?: number | null
          valor_ii?: number | null
          valor_ipi?: number | null
          valor_outros?: number | null
          valor_pis?: number | null
          valor_produtos?: number | null
          valor_seguro?: number | null
          valor_total?: number | null
        }
        Update: {
          base_calculo_icms?: number | null
          base_calculo_icms_st?: number | null
          created_at?: string | null
          id?: string
          nfe_id?: string | null
          updated_at?: string | null
          valor_cofins?: number | null
          valor_desconto?: number | null
          valor_frete?: number | null
          valor_icms?: number | null
          valor_icms_desonerado?: number | null
          valor_icms_st?: number | null
          valor_ii?: number | null
          valor_ipi?: number | null
          valor_outros?: number | null
          valor_pis?: number | null
          valor_produtos?: number | null
          valor_seguro?: number | null
          valor_total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "nfe_totais_nfe_id_fkey"
            columns: ["nfe_id"]
            isOneToOne: false
            referencedRelation: "nfe"
            referencedColumns: ["id"]
          },
        ]
      }
      nfe_transporte: {
        Row: {
          created_at: string | null
          especie: string | null
          id: string
          modalidade_frete: string | null
          nfe_id: string | null
          peso_bruto: number | null
          peso_liquido: number | null
          quantidade_volumes: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          especie?: string | null
          id?: string
          modalidade_frete?: string | null
          nfe_id?: string | null
          peso_bruto?: number | null
          peso_liquido?: number | null
          quantidade_volumes?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          especie?: string | null
          id?: string
          modalidade_frete?: string | null
          nfe_id?: string | null
          peso_bruto?: number | null
          peso_liquido?: number | null
          quantidade_volumes?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nfe_transporte_nfe_id_fkey"
            columns: ["nfe_id"]
            isOneToOne: false
            referencedRelation: "nfe"
            referencedColumns: ["id"]
          },
        ]
      }
      pallets: {
        Row: {
          created_at: string | null
          descricao: string
          dimensoes: string | null
          id: string
          peso_maximo: number | null
          status: string | null
          tipo: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          descricao: string
          dimensoes?: string | null
          id?: string
          peso_maximo?: number | null
          status?: string | null
          tipo: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          descricao?: string
          dimensoes?: string | null
          id?: string
          peso_maximo?: number | null
          status?: string | null
          tipo?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tipos_paletes: {
        Row: {
          created_at: string | null
          descricao: string
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          descricao: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          descricao?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      transportadoras: {
        Row: {
          cidade: string | null
          cnpj: string | null
          created_at: string | null
          email: string | null
          endereco: string | null
          estado: string | null
          id: string
          inscricao_estadual: string | null
          nome_fantasia: string | null
          razao_social: string
          status: string | null
          telefone: string | null
          updated_at: string | null
        }
        Insert: {
          cidade?: string | null
          cnpj?: string | null
          created_at?: string | null
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          inscricao_estadual?: string | null
          nome_fantasia?: string | null
          razao_social: string
          status?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
        Update: {
          cidade?: string | null
          cnpj?: string | null
          created_at?: string | null
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          inscricao_estadual?: string | null
          nome_fantasia?: string | null
          razao_social?: string
          status?: string | null
          telefone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          created_at: string | null
          email: string
          id: string
          nome: string
          role: string | null
          senha: string
          status: string | null
          ultimo_login: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          nome: string
          role?: string | null
          senha: string
          status?: string | null
          ultimo_login?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          nome?: string
          role?: string | null
          senha?: string
          status?: string | null
          ultimo_login?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_nfe_and_related: {
        Args: {
          nfe_id_param: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
