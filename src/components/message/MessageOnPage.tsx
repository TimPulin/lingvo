type MessageOnPagePropsType = {
  messageText: string;
};

export default function MessageOnPage(props:MessageOnPagePropsType) {
  return (
    <div className="content__list content__list--message-on-page">
      <div className="content__item">
        {props.messageText}
      </div>
    </div>
  );
}
