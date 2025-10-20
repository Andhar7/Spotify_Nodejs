import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  bgColor: string;
}

const StatsCard = ({ icon: Icon, label, value, bgColor }: StatsCardProps) => {
  return (
    <Card className='bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/80 transition-all'>
      <CardContent className='p-6'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-zinc-400 text-sm'>{label}</p>
            <p className='text-3xl font-bold text-white mt-2'>{value}</p>
          </div>
          <div className={`p-3 rounded-full ${bgColor}`}>
            <Icon className='h-6 w-6 text-white' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
