import React from 'react';
import { Image, FileText, Paperclip, Download } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
  isOperator: boolean;
}

const getFileIcon = (type: string) => {
  switch (type) {
    case 'image':
      return <Image className="h-4 w-4" />;
    case 'document':
      return <FileText className="h-4 w-4" />;
    default:
      return <Paperclip className="h-4 w-4" />;
  }
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const FilePreview = ({ message }: { message: ChatMessageType }) => {
  if (message.type === 'image') {
    return (
      <div className="space-y-2">
        <img
          src={message.fileUrl}
          alt={message.fileName || 'Imagem anexada'}
          className="rounded-lg max-w-full"
        />
        <div className="flex items-center justify-between text-xs">
          <span>{message.fileName}</span>
          <span>{formatFileSize(message.fileSize || 0)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-white/10 rounded p-2">
      {getFileIcon(message.type)}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">
          {message.fileName}
        </div>
        <div className="text-xs opacity-75">
          {formatFileSize(message.fileSize || 0)}
        </div>
      </div>
      {message.fileUrl && (
        <a
          href={message.fileUrl}
          download
          className="p-1.5 rounded-full hover:bg-white/20"
          title="Download arquivo"
        >
          <Download className="h-4 w-4" />
        </a>
      )}
    </div>
  );
};

export default function ChatMessage({ message, isOperator }: ChatMessageProps) {
  return (
    <div className={`flex ${isOperator ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isOperator
            ? 'bg-primary-light text-white'
            : 'bg-primary-pale text-primary-dark'
        }`}
      >
        <div className="flex items-center gap-2 text-xs mb-1">
          <span className="font-medium">{message.sender}</span>
          <span className="opacity-75">•</span>
          <span className="opacity-75">
            {format(new Date(message.timestamp), "HH:mm", { locale: ptBR })}
          </span>
        </div>
        
        {message.type === 'text' ? (
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        ) : (
          <FilePreview message={message} />
        )}
      </div>
    </div>
  );
}