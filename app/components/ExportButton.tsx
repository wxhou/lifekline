'use client';

import React, { useState, useRef } from 'react';
import { Download, FileImage, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ExportButtonProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
}

const ExportButton: React.FC<ExportButtonProps> = ({ targetRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const formatDate = () => {
    const date = new Date();
    return date.toISOString().slice(0, 10).replace(/-/g, '');
  };

  const exportToPNG = async () => {
    if (!targetRef.current) return;
    setIsExporting(true);

    try {
      const canvas = await html2canvas(targetRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `卜算子_命理分析_${formatDate()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Export to PNG failed:', error);
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  const exportToPDF = async () => {
    if (!targetRef.current) return;
    setIsExporting(true);

    try {
      const canvas = await html2canvas(targetRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`卜算子_命理分析_${formatDate()}.pdf`);
    } catch (error) {
      console.error('Export to PDF failed:', error);
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isExporting}
        className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
      >
        {isExporting ? (
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        导出报告
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 py-1 z-50">
          <button
            onClick={exportToPNG}
            disabled={isExporting}
            className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-700 dark:text-slate-300"
          >
            <FileImage className="w-4 h-4" />
            导出PNG
          </button>
          <button
            onClick={exportToPDF}
            disabled={isExporting}
            className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-700 dark:text-slate-300"
          >
            <FileText className="w-4 h-4" />
            导出PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportButton;
