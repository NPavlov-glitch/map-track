import AppLayout from '@/layouts/app-layout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Head, useForm } from '@inertiajs/react';
import { MapDrawing } from '@/components/map-drawing';
import { Button } from '@/components/ui/button';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        distance: '',
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
                        }}
                    >
                        Draw Route
                    </Button>

                    <MapDrawing
                        onRouteUpdate={(route) => {
                            setData('route', route);
                        }}
                    />
                </form>
            </div>
        </AppLayout>
    );
}
