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
        distance: 0,
        average_speed: '',
        route: [] as any[],
        start_time: '',
        end_time: '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/walks'); // This would send the data to a 'store' method in your controller
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
    };

    return (
        <AppLayout>
            <Head title="Initialize Walk" />
            <div className="w-8/12 p-4">
                <h1 className="text-4xl font-black mb-5">
                    New <span className="text-white/20">Walk</span>
                </h1>
                <form onSubmit={submit} className="flex flex-col gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Title</Label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            placeholder="Give it a name"
                        />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="start_time">Start Time</Label>
                        <Input
                            id="start_time"
                            type="datetime-local"
                            name="start_time"
                            value={data.start_time}
                            onChange={(e) => setData({ ...data, start_time: e.target.value })}
                            min={new Date().toISOString().slice(0,16)}
                        />
                        {errors.start_time && <div className="text-red-500 text-sm">{errors.start_time}</div>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="end_time">End Time</Label>
                        <Input
                            id="end_time"
                            type="datetime-local"
                            name="end_time"
                            value={data.end_time}
                            onChange={(e) => setData({ ...data, end_time: e.target.value })}
                            min={new Date().toISOString().slice(0,16)}
                        />
                        {errors.end_time && <div className="text-red-500 text-sm">{errors.end_time}</div>}
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
                        <DialogContent className="max-w-[95vw] w-[95vw] sm:max-w-[95vw] h-[95vh] max-h-[95vh] p-0 overflow-hidden">
                            <MapDrawing
                                onRouteUpdate={(route) => {
                                    setData({ ...data, route: route as unknown as never[] });
                                    setIsMapOpen(false); // Close after saving
                                }}
                            />
                        </DialogContent>
                    </Dialog>

                    <Button type="submit" disabled={processing}>Create Walk</Button>
                </form>
            </div>
        </AppLayout>
    );
}
