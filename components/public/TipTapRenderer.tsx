import React from 'react';
import Image from 'next/image';

export interface TipTapNode {
  type: string;
  attrs?: Record<string, string | number | boolean>;
  content?: TipTapNode[];
  text?: string;
  marks?: { type: string; attrs?: Record<string, string | number | boolean> }[];
}

export const TipTapRenderer: React.FC<{ jsonStr: string }> = ({ jsonStr }) => {
  if (!jsonStr) return null;
  
  let doc: TipTapNode;
  try {
    // Attempt to parse standard TipTap JSON
    doc = JSON.parse(jsonStr);
  } catch {
    // If it's not a JSON string, treat it as raw HTML
    return <div className="font-body text-base text-text-primary leading-relaxed" dangerouslySetInnerHTML={{ __html: jsonStr }} />;
  }

  const renderMark = (text: string, marks?: TipTapNode['marks']) => {
    if (!marks || marks.length === 0) return text;
    let rendered: React.ReactNode = text;
    
    marks.forEach((mark) => {
      if (mark.type === 'bold') {
        rendered = <strong className="font-semibold text-text-primary" key={mark.type}>{rendered}</strong>;
      } else if (mark.type === 'italic') {
        rendered = <em className="italic text-text-primary" key={mark.type}>{rendered}</em>;
      } else if (mark.type === 'strike') {
        rendered = <span className="line-through text-text-muted" key={mark.type}>{rendered}</span>;
      } else if (mark.type === 'code') {
        rendered = <code className="bg-cream-dark/20 px-1 py-0.5 rounded font-mono text-xs text-terracotta" key={mark.type}>{rendered}</code>;
      } else if (mark.type === 'link') {
        rendered = (
          <a 
            key={mark.type}
            href={typeof mark.attrs?.href === 'string' ? mark.attrs.href : ''} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-terracotta hover:underline font-medium break-all"
          >
            {rendered}
          </a>
        );
      }
    });
    
    return rendered;
  };

  const renderNode = (node: TipTapNode, index: number): React.ReactNode => {
    if (node.type === 'text') {
      return <React.Fragment key={index}>{renderMark(node.text || '', node.marks)}</React.Fragment>;
    }

    const children = node.content ? node.content.map((child, i) => renderNode(child, i)) : null;

    switch (node.type) {
      case 'doc':
        return <div className="flex flex-col gap-5" key={index}>{children}</div>;
      case 'paragraph':
        return <p key={index} className="font-body text-base text-text-primary leading-relaxed">{children}</p>;
      case 'heading': {
        const level = node.attrs?.level || 1;
        if (level === 1) return <h1 key={index} className="font-display text-3xl font-bold text-sage-dark mt-6 mb-2">{children}</h1>;
        if (level === 2) return <h2 key={index} className="font-display text-2xl font-semibold text-sage-dark mt-6 mb-2">{children}</h2>;
        if (level === 3) return <h3 key={index} className="font-body text-xl font-bold text-sage-dark mt-4 mb-2">{children}</h3>;
        return <h4 key={index} className="font-body text-lg font-bold text-text-primary mt-4 mb-2">{children}</h4>;
      }
      case 'bulletList':
        return <ul key={index} className="list-disc pl-6 flex flex-col gap-2 font-body text-base text-text-primary leading-relaxed my-2">{children}</ul>;
      case 'orderedList':
        return <ol key={index} className="list-decimal pl-6 flex flex-col gap-2 font-body text-base text-text-primary leading-relaxed my-2">{children}</ol>;
      case 'listItem':
        return <li key={index} className="pl-1">{children}</li>;
      case 'blockquote':
        return (
          <blockquote key={index} className="border-l-4 border-terracotta bg-cream p-4 rounded-r-xl my-4 italic text-text-muted leading-relaxed">
            {children}
          </blockquote>
        );
      case 'horizontalRule':
        return <hr key={index} className="border-t border-border-light my-6" />;
      case 'image': {
        const src = typeof node.attrs?.src === 'string' ? node.attrs.src : '';
        const alt = typeof node.attrs?.alt === 'string' ? node.attrs.alt : 'Blog illustration';
        return (
          <div key={index} className="relative w-full aspect-video rounded-2xl overflow-hidden my-6 bg-cream border border-border-light/40">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        );
      }
      default:
        return <div key={index}>{children}</div>;
    }
  };

  return <div className="tiptap-content flex flex-col gap-4">{renderNode(doc, 0)}</div>;
};
