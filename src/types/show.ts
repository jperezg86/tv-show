export type Show = {
    id:             number;
    url:            string;
    name:           string;
    type:           string;
    language:       string;
    genres:         string[];
    status:         string;
    runtime:        number;
    averageRuntime: number;
    premiered:      Date;
    ended:          Date;
    officialSite:   string;
    schedule:       Schedule;
    rating:         Rating;
    weight:         number;
    network:        Network;
    webChannel:     null;
    dvdCountry:     null;
    externals:      Externals;
    image:          Image;
    summary:        string;
    updated:        number;
    _links:         Links;
}

export type Links = {
    self:            Previousepisode;
    previousepisode: Previousepisode;
}

export type Previousepisode = {
    href: string;
}

export type Externals = {
    tvrage:  number;
    thetvdb: number;
    imdb:    string;
}

export type Image = {
    medium:   string;
    original: string;
}

export type Network = {
    id:           number;
    name:         string;
    country:      Country;
    officialSite: string;
}

export type Country = {
    name:     string;
    code:     string;
    timezone: string;
}

export type Rating = {
    average: number;
}

export type Schedule = {
    time: string;
    days: string[];
}