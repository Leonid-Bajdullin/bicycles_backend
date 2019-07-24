import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bicycle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  rent_price: number;

  @Column()
  is_rented: boolean;
}
