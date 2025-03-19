export interface Seat {
  status: "available" | "occupied" | "selected";
  row_number: number;
  seat_number: number;
  id:number;
}


export type SeatGrid = Seat[][];

interface Time{
  time:string,
  id:number
}
export interface Movies{
id:number,
title:string,
duration:string,
sypnosis:string,
rating:string,
img:string
schedules:Time[]
}