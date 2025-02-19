import { HistoryLogType } from './lib/types';
import './HistoryLog.css';

function getLogType(logType: string) {
  const logTypes: Record<string, string> = {
    Create: 'created',
    Update: 'updated',
    Move: 'moved',
  };
  return logTypes[logType];
}

function HistoryLog(props: { historyLog: HistoryLogType[] | undefined }) {
  return (
    <div className="history-log">
      <p className="history-log__title">History Log</p>
      <div className="history-log__container">
        {props.historyLog &&
          props.historyLog.map((log) => (
            <p key={log.id} className="history-log__log">
              {log.username} {getLogType(log.changedType)} the task at{' '}
              {new Date(log.changedAt).toLocaleString()}
            </p>
          ))}
      </div>
    </div>
  );
}

export default HistoryLog;
