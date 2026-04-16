import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) { }

  async findAll(): Promise<Categoria[]> {
    const categorias = await this.categoriaRepository.find();
    if (categorias.length === 0) {
      throw new HttpException(
        'Nenhuma categoria encontrada!',
        HttpStatus.NO_CONTENT,
      );
    }
    return categorias;
  }

  async findById(id: number): Promise<Categoria> {
    let categoria = await this.categoriaRepository.findOne({
      where: { id },
    });
    if (!categoria)
      throw new HttpException(
        'Categoria não encontrada!',
        HttpStatus.NOT_FOUND,
      );
    return categoria;
  }

  async findByNome(nome: string): Promise<Categoria[]> {
    if (!nome || nome.trim().length === 0) {
      throw new HttpException('O termo de busca não pode estar vazio!', HttpStatus.BAD_REQUEST);
    }
    const categorias = await this.categoriaRepository.find({
      where: { nome: ILike(`%${nome}%`) },
    });
    if (categorias.length === 0) {
      throw new HttpException('Nenhuma categoria encontrada com esse nome!', HttpStatus.NOT_FOUND);
    }
    return categorias;
  }

  async create(categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(categoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    await this.findById(categoria.id);
    return await this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.categoriaRepository.delete(id);
  }
}
