type CardTranscriptionPropsType = {
  transcription: string;
};

export default function CardTranscription(props:CardTranscriptionPropsType) {
  if (!props.transcription) {
    return null;
  }
  return (
    <div className="card__transcription">
      [
      {props.transcription}
      ]
    </div>
  );
}
