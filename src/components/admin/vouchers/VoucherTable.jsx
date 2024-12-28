import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast } from "sonner";
import { format, isValid, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

const VoucherTable = ({ vouchers = [] }) => {
  console.log('Renderizando VoucherTable com:', {
    quantidadeVouchers: vouchers?.length,
    vouchers,
    primeiroVoucher: vouchers?.[0]
  });

  const formatDate = (dateString) => {
    if (!dateString) {
      console.log('Data inválida recebida:', dateString);
      return '-';
    }
    const date = parseISO(dateString);
    console.log('Formatando data:', {
      original: dateString,
      parsed: date,
      isValid: isValid(date)
    });
    return isValid(date) ? format(date, "dd/MM/yyyy HH:mm", { locale: ptBR }) : '-';
  };

  const downloadPDF = () => {
    try {
      if (!vouchers || vouchers.length === 0) {
        toast.error('Não há dados para exportar');
        return;
      }

      const doc = new jsPDF();
      
      doc.setFontSize(14);
      doc.text('Vouchers Descartáveis Ativos', 14, 15);
      
      const tableData = vouchers.map(voucher => [
        voucher.codigo || '-',
        voucher.tipos_refeicao?.nome || '-',
        formatDate(voucher.data_criacao),
        formatDate(voucher.data_uso),
        formatDate(voucher.data_expiracao)
      ]);

      autoTable(doc, {
        head: [['Código', 'Tipo Refeição', 'Data Criação', 'Data Uso', 'Data Expiração']],
        body: tableData,
        startY: 25,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [59, 130, 246] }
      });

      const fileName = `vouchers-descartaveis-ativos-${format(new Date(), 'dd-MM-yyyy-HH-mm', { locale: ptBR })}.pdf`;
      doc.save(fileName);
      toast.success('PDF gerado com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast.error('Erro ao gerar PDF: ' + error.message);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Label className="text-lg font-semibold text-gray-900">
            Vouchers Descartáveis Ativos
          </Label>
          <Button 
            onClick={downloadPDF} 
            variant="outline" 
            size="sm" 
            className="h-8 text-xs"
            disabled={!vouchers?.length}
          >
            <Download className="mr-2 h-3 w-3" />
            Baixar PDF
          </Button>
        </div>
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-sm font-medium text-gray-700">Código</TableHead>
                <TableHead className="text-sm font-medium text-gray-700">Tipo Refeição</TableHead>
                <TableHead className="text-sm font-medium text-gray-700">Data Criação</TableHead>
                <TableHead className="text-sm font-medium text-gray-700">Data Uso</TableHead>
                <TableHead className="text-sm font-medium text-gray-700">Data Expiração</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vouchers && vouchers.length > 0 ? (
                vouchers.map((voucher) => (
                  <TableRow key={voucher.id} className="hover:bg-gray-50">
                    <TableCell className="text-sm">{voucher.codigo || '-'}</TableCell>
                    <TableCell className="text-sm">{voucher.tipos_refeicao?.nome || '-'}</TableCell>
                    <TableCell className="text-sm">{formatDate(voucher.data_criacao)}</TableCell>
                    <TableCell className="text-sm">{formatDate(voucher.data_uso)}</TableCell>
                    <TableCell className="text-sm">{formatDate(voucher.data_expiracao)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-sm text-gray-500 py-8">
                    Nenhum voucher ativo encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoucherTable;