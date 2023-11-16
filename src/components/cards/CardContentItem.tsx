type CardPageBaseProps = {
  ElementJSX: any;
};

export default function CardContentItem(props: CardPageBaseProps) {
  const { ElementJSX } = props;
  return (

    <div className="content__item ">
      {ElementJSX}
    </div>
  );
}
