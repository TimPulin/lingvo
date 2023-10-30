import LoaderSpinner from './LoaderSpinner';
import { useDataLoading } from '../global-context-provider/loading-context-hook';

const CLASS_SHOW = 'loader-overlay--show';

export default function LoaderOverlay() {
  const { isDataLoading } = useDataLoading();

  const isShow = () => (isDataLoading ? CLASS_SHOW : '');

  return (
    <div className={`loader-overlay ${isShow()}`}>
      <LoaderSpinner />
    </div>
  );
}

// ${CLASS_SHOW}
