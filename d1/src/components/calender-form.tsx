"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function CalendarForm() {
    const [date, setDate] = useState<Date>()
    const [time, setTime] = useState<string>("")

    return (
        <Card>
            <CardHeader>
                <CardTitle>Schedule a Meeting</CardTitle>
                <CardDescription>Choose a date and time for our meeting.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="space-y-2">
                    <Label>Time</Label>
                    <div className="flex">
                        <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                            onClick={() => document.getElementById('time-input')?.focus()}
                        >
                            <Clock className="mr-2 h-4 w-4" />
                            {time || <span className="text-muted-foreground">Set a time</span>}
                        </Button>
                        <Input
                            id="time-input"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="sr-only"
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={() => {
                    if (date && time) {
                        toast({
                            title: "Meeting Scheduled",
                            description: `Your meeting is set for ${format(date, "PPP")} at ${time}.`,
                        })
                    } else {
                        toast({
                            title: "Error",
                            description: "Please select both a date and time.",
                            variant: "destructive",
                        })
                    }
                }}>
                    Schedule Meeting
                </Button>
            </CardFooter>
        </Card>
    )
}