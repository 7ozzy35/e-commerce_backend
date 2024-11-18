import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number = 0; // Varsayılan değer

  @Column()
  name: string = ''; // Varsayılan değer

  @Column()
  description: string = ''; // Varsayılan değer

  @Column()
  category: string = ''; // Varsayılan değer

  @Column('decimal', { precision: 10, scale: 2 })
  price: number = 0.0; // Varsayılan değer

  @Column()
  inventory: number = 0; // Varsayılan değer
}
