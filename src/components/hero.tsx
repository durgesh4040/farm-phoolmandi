export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-muted">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid min-h-[60vh] grid-cols-1 items-center gap-14 py-16 lg:grid-cols-2 lg:py-24">
                    <div className="space-y-8">
                        <div className="inline-flex items-center rounded-full bg-secondary/10 px-5 py-2 text-sm font-medium text-secondary">
                            🌸 Farm Fresh Flowers
                        </div>
                        <div className="space-y-6">
                            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-7xl">
                                Fresh Flowers
                                <span className="block text-primary">
                                    From Our Farm
                                </span>
                            </h1>
                            <p className="max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
                                Handpicked blooms delivered with love and care.
                                Bringing freshness, beauty, and happiness
                                directly from local farms to your home.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <button className="h-12 rounded-full bg-primary px-8 font-medium text-white shadow-lg transition-all hover:scale-105 hover:bg-primary/90">
                                Shop Flowers
                            </button>
                            <button className="h-12 rounded-full border border-border bg-background px-8 font-medium transition-all hover:bg-accent hover:text-white">
                                Explore Farm
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-secondary/20 blur-3xl" />

                        {/* Hero Image */}
                        <div className="relative overflow-hidden rounded-[32px] shadow-2xl">

                            <img
                                src="/images/hero-flower.jpg"
                                alt="Flower Farm"
                                className="h-[500px] w-full object-cover lg:h-[700px]"
                            />

                        </div>

                        {/* Floating Card */}
                        <div className="absolute bottom-6 left-6 rounded-3xl bg-white/90 p-5 shadow-xl backdrop-blur">

                            <div className="space-y-1">

                                <p className="text-sm text-muted-foreground">
                                    Trusted by
                                </p>

                                <h4 className="text-xl font-bold">
                                    50K+ Customers
                                </h4>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}