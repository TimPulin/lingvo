type MessageOnPagePropsType = {
  messageText: string;
  ElementJSX?: React.ReactNode;

};

export default function MessageOnPage(props:MessageOnPagePropsType) {
  return (
    <div className="content__list content__list--message-on-page">
      <div className="content__item">
        {props.messageText}
        {props.ElementJSX}
      </div>
    </div>
  );
}

MessageOnPage.defaultProps = {
  ElementJSX: null,
};
