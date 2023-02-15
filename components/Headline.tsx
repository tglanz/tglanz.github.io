interface Props {
  title: string,
  subtitle: string
}

const Headline = ({ title, subtitle }: Props) => {
  return (
    <div className="
        p-2
        flex flex-col items-center">
      <span className="text-4xl font-semibold">{title}</span>
      <span className="text-lg">{subtitle}</span>
    </div>
  )
};

export default Headline;