import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = '';

  @Column()
  description: string = '';

  @Column()
  category: string = '';

  @Column('decimal', { precision: 10, scale: 2 })
  price: number = 0.0;

  @Column()
  inventory: number = 0;

  @Column({ nullable: true })
  color?: string = '';

  @Column({ nullable: true })
  size?: string = '';
}
