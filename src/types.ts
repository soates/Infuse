interface InjectionState {
    instance: any;
}

export interface Injectable {
    name: string;
    obj: any;
    state: InjectionState;
}
