export class SideBarLink {
  constructor(
    public name: string,
    public icon: string,
    public url?: string,
    public isDivider: boolean = false
  ) {}
}
