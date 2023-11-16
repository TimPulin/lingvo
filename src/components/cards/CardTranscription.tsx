type CardTranscriptionPropsType = {
  transcription: string;
};

export default function CardTranscription(props:CardTranscriptionPropsType) {
  if (!props.transcription) {
    return null;
  }
  return (
    <div className="card__transcription">
      <span className="card__transcription-bracket" />
      <span className="card__transcription-bracket" />
      <span className="card__transcription-bracket" />
      <span className="card__transcription-bracket" />
      {props.transcription}
    </div>
  );
}
