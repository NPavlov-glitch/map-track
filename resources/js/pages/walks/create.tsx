import AppLayout from '@/layouts/app-layout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Head, useForm } from '@inertiajs/react';
import { MapDrawing } from '@/components/map-drawing';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useState } from 'react';

export default function Create() {
    const [isMapOpen, setIsMapOpen] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        distance: '',
        route: [],
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/walks'); // This would send the data to a 'store' method in your controller
    };

    return (
        <AppLayout>
            <Head title="Initialize Walk" />
            <div className="w-8/12 p-4">
                <h1 className="text-4xl font-black mb-5">
                    New <span className="text-white/20">Walk</span>
                </h1>
                <form className="flex flex-col gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="start_time">Start Time</Label>
                        <Input
                            id="start_time"
                            type="datetime-local"
                            name="start_time"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="end_time">End Time</Label>
                        <Input
                            id="end_time"
                            type="datetime-local"
                            name="end_time"
                            required
                        />
                    </div>

                    <Button
                        type="button"
                        disabled={processing}
                        className="w-fit"
                        onClick={() => {
                            setIsMapOpen(true);
                        }}
                    >
                        Draw Route
                    </Button>

                    <Dialog open={isMapOpen} onOpenChange={(open) => !open && setIsMapOpen(false)}>
                        <DialogContent className="max-w-[95vw] w-[95vw] h-[95vh] max-h-[95vh] p-0 overflow-hidden">
                            <MapDrawing
                                onRouteUpdate={(route) => {
                                    setData({ ...data, route: route as unknown as never[] });
                                    setIsMapOpen(false); // Close after saving
                                }}
                            />
                        </DialogContent>
                    </Dialog>
                </form>
            </div>
        </AppLayout>
    );
}
