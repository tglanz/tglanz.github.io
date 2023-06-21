export interface Params {
  slug: string,
}

export interface Props {
  params: Params
}

export const metadata = {
  title: "tglanz Blog",
}

export async function generateStaticParams() {
  const slugs = ["1", "x", "y"];
  return slugs.map(slug => ({ slug }));
}

export default function Slug(props: Props) {
  const slug = props.params.slug;
  return (
    <div>
      Slug: {slug}
    </div>
  );
}
