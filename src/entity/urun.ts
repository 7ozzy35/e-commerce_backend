import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Urun {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ad: string;

  @Column("decimal")
  fiyat: number;

  @Column()
  stok: number;
}
