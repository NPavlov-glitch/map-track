import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Calendar, Clock, Footprints, Gauge, Timer } from 'lucide-react';
import { MapView } from '@/components/map-view';

interface Walk {
    id: number,
    name: string | null,
    distance: number,
    average_speed: number,
    start_time: string,
    end_time: string,
    route: any,
    duration: number,
}

interface WalkModalProps {
    walk: Walk | null,
    isOpen: boolean,
    onClose: () => void,
}

export function WalkModal({walk, isOpen, onClose}: WalkModalProps){

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    }

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    if (!walk) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {walk?.name || `Walk #${walk?.id}`}
                    </DialogTitle>
                    <DialogDescription className="flex items-center gap-2">
                        <Calendar className="size-4" />
                        {formatDate(walk?.start_time)} at {formatTime(walk?.start_time)}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                    <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounder-1g border">
                        <Footprints className="size-5 text-primary mb-2" />
                        <span className="text-xs uppercase font-semibold text-muted-foreground">Distance</span>
                        <span className="text-xl font-bold">{walk?.distance} km</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounder-1g border">
                        <Timer className="size-5 text-primary mb-2" />
                        <span className="text-xs uppercase font-semibold text-muted-foreground">Duration</span>
                        <span className="text-xl font-bold">{walk?.duration} min</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounder-1g border">
                        <Gauge className="size-5 text-primary mb-2" />
                        <span className="text-xs uppercase font-semibold text-muted-foreground">Avg Speed</span>
                        <span className="text-xl font-bold">{walk?.average_speed} km/h</span>
                    </div>
                </div>

                <div className="h-[350px] w-full mt-2">
                    <MapView route={walk?.route} />
                </div>

                <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground border-t pt-4">
                    <div className="flex items-center gap-1">
                        <Clock className="size-4" />
                        Started: {formatTime(walk?.start_time)}
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="size-4" />
                        Ended: {formatTime(walk?.end_time)}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
