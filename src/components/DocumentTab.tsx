import React from 'react';
import { FileText, Download, CheckCircle, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Document } from '../types';
import { requiredDocuments } from '../data/documents';

interface DocumentTabProps {
  documents: Document[];
  status: string;
}

export default function DocumentTab({ documents, status }: DocumentTabProps) {
  const getRequiredDocs = () => {
    const allDocs = [
      ...requiredDocuments.vehicle,
      ...requiredDocuments.driver,
      ...requiredDocuments.cargo,
      ...requiredDocuments.insurance
    ].filter(doc => doc.required);

    const submittedDocs = documents.map(doc => doc.type);
    const missingDocs = allDocs.filter(doc => !submittedDocs.includes(doc.type));

    return { submitted: documents, missing: missingDocs };
  };

  const { submitted, missing } = getRequiredDocs();

  return (
    <div className="space-y-6">
      {/* Submitted Documents */}
      <div>
        <h4 className="text-sm font-medium text-primary-dark mb-3">
          Documentos Enviados ({submitted.length})
        </h4>
        <div className="space-y-3">
          {submitted.map((doc, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary-medium" />
                  <span className="text-sm font-medium text-primary-dark">{doc.type}</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span className="text-xs text-primary-medium">
                  {format(new Date(doc.date), "dd/MM/yyyy", { locale: ptBR })}
                </span>
              </div>
              {doc.notes && (
                <p className="text-xs text-primary-medium mb-2">{doc.notes}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {doc.files.map((file, fileIndex) => (
                  <a
                    key={fileIndex}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-3 py-1.5 bg-white rounded text-xs text-primary-medium hover:text-primary-dark border border-gray-200 hover:border-primary-medium transition-colors"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    {file.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Missing Documents */}
      {missing.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-primary-dark mb-3">
            Documentos Pendentes ({missing.length})
          </h4>
          <div className="space-y-2">
            {missing.map((doc, index) => (
              <div key={index} className="p-3 bg-red-50 rounded-lg flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <div>
                  <span className="text-sm font-medium text-red-700">{doc.type}</span>
                  <p className="text-xs text-red-600">{doc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Document Requirements */}
      <div>
        <h4 className="text-sm font-medium text-primary-dark mb-3">
          Requisitos de Documentação
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(requiredDocuments).map(([category, docs]) => (
            <div key={category} className="p-4 bg-gray-50 rounded-lg">
              <h5 className="text-sm font-medium text-primary-dark capitalize mb-2">
                {category}
              </h5>
              <ul className="space-y-2">
                {docs.map((doc, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="mt-1">
                      {doc.required ? (
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 text-yellow-500" />
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-medium text-primary-dark">
                        {doc.type}
                      </span>
                      <p className="text-xs text-primary-medium">
                        {doc.description}
                      </p>
                      {doc.conditions && (
                        <p className="text-xs text-yellow-600 mt-1">
                          Necessário para: {doc.conditions.join(', ')}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}