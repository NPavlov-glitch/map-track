import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Footprints, Calendar, ArrowUpRight, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Walk {
    id: number;
    name: string | null;
    distance: number;
    average_speed: number;
    start_time: string;
    end_time: string;
    route: any;
    duration: number;
}

interface Props {
    walks: Walk[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Walks',
        href: '/walks',
    },
];

export default function Index({ walks }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Your Walks" />

            <div className="flex h-full flex-col p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Walk History</h1>
                        <p className="text-sm text-muted-foreground">Manage and view your recorded journeys.</p>
                    </div>

                    <Button asChild>
                        <Link href="/walks/create">
                            <ArrowUpRight className="mr-2 size-4" />
                            New Walk
                        </Link>
                    </Button>
                </div>

                {walks.length === 0 ? (
                    <Card className="flex flex-col items-center justify-center py-12 text-center border-dashed">
                        <div className="p-3 bg-muted rounded-full mb-4">
                            <Footprints className="size-8 text-muted-foreground" />
                        </div>
                        <CardTitle className="mb-2">No walks recorded</CardTitle>
                        <p className="text-sm text-muted-foreground mb-4">Start your first walk to see it here.</p>
                        <Button variant="outline" asChild>
                            <Link href="/walks/create">Record first walk</Link>
                        </Button>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {walks.map((walk) => (
                            <Link key={walk.id} href={`/walks/${walk.id}`}>
                                <Card className="hover:border-primary transition-colors cursor-pointer overflow-hidden">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-base font-bold">
                                            {walk.name || `Walk #${walk.id}`}
                                        </CardTitle>
                                        <Calendar className="size-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center text-xs text-muted-foreground mb-4">
                                            <Clock className="mr-1 size-3" />
                                            {formatDate(walk.start_time)} at {formatTime(walk.start_time)}
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase font-medium text-muted-foreground">Distance</span>
                                                <span className="text-lg font-bold">{walk.distance} km</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase font-medium text-muted-foreground">Avg Speed</span>
                                                <span className="text-lg font-bold">{walk.average_speed} km/h</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase font-medium text-muted-foreground">Duration</span>
                                                <span className="text-lg font-bold">{walk.duration} min</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
