import React, { useState, useRef } from 'react';
import { Send, Paperclip, X, Image, FileText, AlertCircle } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string, files?: File[]) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || files.length > 0) {
      onSendMessage(message, files);
      setMessage('');
      setFiles([]);
    }
  };

  const validateFile = (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert('Tipo de arquivo não suportado');
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert('Arquivo muito grande. Máximo 10MB');
      return false;
    }
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(validateFile);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).filter(validateFile);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-2"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {/* File Preview */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-lg">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200"
            >
              {getFileIcon(file.type)}
              <div>
                <div className="text-xs font-medium text-primary-dark truncate max-w-[150px]">
                  {file.name}
                </div>
                <div className="text-xs text-primary-medium">
                  {formatFileSize(file.size)}
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Drag & Drop Zone */}
      <div 
        className={`relative flex items-center gap-2 ${
          dragActive ? 'ring-2 ring-primary-light' : ''
        }`}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-primary-medium hover:text-primary-dark hover:bg-primary-pale rounded-lg transition-colors"
            title="Anexar arquivo"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
            accept={ALLOWED_TYPES.join(',')}
          />
        </div>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem ou arraste arquivos aqui..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-transparent"
        />

        <button
          type="submit"
          disabled={!message.trim() && files.length === 0}
          className="p-2 bg-primary-light text-white rounded-lg hover:bg-primary-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Enviar mensagem"
        >
          <Send className="h-5 w-5" />
        </button>

        {/* Drag & Drop Overlay */}
        {dragActive && (
          <div className="absolute inset-0 bg-primary-pale bg-opacity-50 rounded-lg flex items-center justify-center">
            <div className="text-primary-dark font-medium">
              Solte os arquivos aqui
            </div>
          </div>
        )}
      </div>

      {/* File Upload Info */}
      <div className="flex items-center gap-1 text-xs text-primary-medium">
        <AlertCircle className="h-3 w-3" />
        <span>Arquivos suportados: imagens, PDF, DOC, XLS (máx. 10MB)</span>
      </div>
    </form>
  );
}