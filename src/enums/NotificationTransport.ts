export enum NotificationTransportMode {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  NONE = 'NONE',
  IN_APP = 'IN_APP',
}

export type NotificationTransports = {
  [key in NotificationTransportMode]?: true;
}
