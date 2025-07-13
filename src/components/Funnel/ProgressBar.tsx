interface ProgressBarProps {
  progressPercent: number;
}

const ProgressBar = ({ progressPercent }: ProgressBarProps) => {
  return (
    <div className="bg-muted h-2 rounded-full overflow-hidden mb-8">
      <div 
        className="bg-secondary h-full rounded-full transition-all duration-300"
        style={{ width: `${progressPercent}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar; 