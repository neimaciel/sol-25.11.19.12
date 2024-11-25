import React from 'react';
import { FileText, Download, Calendar, Clock, User, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  uploadedBy: string;
  tags: string[];
  url: string;
}

interface AttachmentsTabProps {
  attachments: Attachment[];
}

export default function AttachmentsTab({ attachments }: AttachmentsTabProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    const icons = {
      pdf: '📄',
      doc: '📝',
      docx: '📝',
      xls: '📊',
      xlsx: '📊',
      jpg: '🖼️',
      jpeg: '🖼️',
      png: '🖼️',
      zip: '📦',
      default: '📎'
    };
    return icons[type as keyof typeof icons] || icons.default;
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="p-4 border-2 border-dashed border-primary-pale rounded-lg hover:border-primary-medium transition-colors">
        <div className="text-center">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            multiple
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center justify-center"
          >
            <span className="text-4xl mb-2">📤</span>
            <span className="text-sm font-medium text-primary-dark">
              Arraste arquivos ou clique para fazer upload
            </span>
            <span className="text-xs text-primary-medium mt-1">
              Suporta PDF, DOC, XLS, JPG, PNG (max. 10MB)
            </span>
          </label>
        </div>
      </div>

      {/* Attachments List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-primary-dark">
            Anexos ({attachments.length})
          </h4>
          <div className="flex gap-2">
            <select className="text-xs border rounded-md px-2 py-1">
              <option>Mais recentes</option>
              <option>Mais antigos</option>
              <option>Por tamanho</option>
              <option>Por tipo</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {attachments.map((file) => (
            <div
              key={file.id}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getFileIcon(file.type)}</span>
                  <div>
                    <h5 className="text-sm font-medium text-primary-dark mb-1">
                      {file.name}
                    </h5>
                    <div className="flex flex-wrap gap-4 text-xs text-primary-medium">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(file.uploadedAt), "dd/MM/yyyy", { locale: ptBR })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {format(new Date(file.uploadedAt), "HH:mm", { locale: ptBR })}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {file.uploadedBy}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {formatFileSize(file.size)}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {file.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full bg-primary-pale text-xs text-primary-dark"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <a
                  href={file.url}
                  download
                  className="flex items-center px-3 py-1.5 bg-white rounded text-xs text-primary-medium hover:text-primary-dark border border-gray-200 hover:border-primary-medium transition-colors"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}