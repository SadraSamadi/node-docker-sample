import {join} from 'path';

export function asset(name: string): string {
  return join(__dirname, 'assets', name);
}
