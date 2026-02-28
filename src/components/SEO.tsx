import React from 'react';

interface SEOProps {
  title: string;
  description: string;
}

export default function SEO({ title, description }: SEOProps) {
  React.useEffect(() => {
    document.title = `${title} | Sagacious CGL`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
}
