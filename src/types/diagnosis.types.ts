// Tipo principal do diagnóstico retornado pela IA
export type Diagnosis = {
  diagnosticoProvavel: string;
  doencasAssociadas: string[];
  examesSugeridos: string[];
  medicamentosComuns: string[];
  observacao: string;
  error?: string;
};
