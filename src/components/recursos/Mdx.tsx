import Link from 'next/link';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import type { AnchorHTMLAttributes, HTMLAttributes } from 'react';

/**
 * Compila el cuerpo MDX de un artículo.
 *
 * Se compila EN EL BUILD, dentro de un componente de servidor: en el HTML
 * exportado no queda ni MDX ni compilador, solo etiquetas. Por eso funciona con
 * output: 'export'.
 *
 * QUE NO PUEDE HACER UN .MDX (y por que):
 *  - Estilos en linea. `articles.ts` los rechaza y tumba el build. Un `style`
 *    escrito a mano es un color fuera de tailwind.config.ts, que es la regla 2.
 *  - Componentes de React propios. El mapa de abajo es todo lo que hay: si un
 *    articulo necesita un bloque nuevo, se anade aqui, con sus tokens, y queda
 *    disponible para todos.
 *
 * El estilo NO se aplica etiqueta por etiqueta: lo pone `.prose-nodbu` desde
 * globals.css sobre el contenedor. Aqui solo se sobreescribe lo que necesita
 * estructura distinta del HTML por defecto.
 */

/** Un enlace de un artículo. Interno con Link, externo con las protecciones. */
function MdxLink({ href = '', children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isInternal = href.startsWith('/') || href.startsWith('#');

  if (isInternal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  // Los externos abren en pestana nueva. `noopener` es obligatorio: sin el, la
  // pagina destino puede manipular la nuestra a traves de window.opener.
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

/**
 * Las tablas se envuelven en un contenedor con desplazamiento propio.
 *
 * Una tabla de comparacion de cuatro columnas no cabe en 360px. Sin esto,
 * desborda y hace que se desplace la PAGINA entera en horizontal, que es el
 * fallo tipico de un blog en movil. Asi se desplaza solo la tabla.
 */
function MdxTable(props: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="-mx-gutter overflow-x-auto px-gutter sm:mx-0 sm:px-0">
      <table {...props} />
    </div>
  );
}

const components = {
  a: MdxLink,
  table: MdxTable,
};

// El tipo explicito no es decorativo: sin el, TypeScript ensancha el par
// [plugin, opciones] de rehype-autolink-headings a un array normal y deja de
// encajar con `Pluggable`, que exige una tupla.
const options: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      // Pone un id en cada encabezado. El indice lateral depende de que estos
      // id coincidan con los que calcula articles.ts.
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: {
            className: 'heading-anchor',
            // El enlace es decorativo para quien ve la pagina, pero tiene que
            // decir algo a quien navega con lector de pantalla.
            'aria-label': 'Enlace a este apartado',
          },
          content: { type: 'text', value: '#' },
        },
      ],
    ],
  },
};

export function Mdx({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} options={options} />;
}
