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
    const categorias = await this.categoriaRepository.find({
      relations: { produto: true },
    });
    if (categorias.length === 0) {
      throw new HttpException(
        'Nenhuma categoria encontrada!',
        HttpStatus.NOT_FOUND,
      );
    }
    return categorias;
  }

  async findById(id: number): Promise<Categoria> {
    if (id <= 0) {
      throw new HttpException('ID inválido!', HttpStatus.BAD_REQUEST);
    }
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
      relations: { produto: true },
    });
    if (!categoria) {
      throw new HttpException(
        'Categoria não encontrada!',
        HttpStatus.NOT_FOUND,
      );
    }
    return categoria;
  }

  async findByNome(nome: string): Promise<Categoria[]> {
    if (!nome || nome.trim().length === 0) {
      throw new HttpException('O termo de busca não pode estar vazio!', HttpStatus.BAD_REQUEST);
    }
    const categorias = await this.categoriaRepository.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: { produto: true },
    });
    if (categorias.length === 0) {
      throw new HttpException('Nenhuma categoria encontrada com esse nome!', HttpStatus.NOT_FOUND);
    }
    return categorias;
  }

  async create(categoria: Categoria): Promise<Categoria> {
    if (!categoria.nome || categoria.nome.trim().length === 0) {
      throw new HttpException('O nome da categoria é obrigatório!', HttpStatus.BAD_REQUEST);
    }
    return await this.categoriaRepository.save(categoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    if (!categoria.id || categoria.id <= 0) {
      throw new HttpException('O ID da categoria é obrigatório e deve ser válido!', HttpStatus.BAD_REQUEST);
    }
    await this.findById(categoria.id);
    if (!categoria.nome || categoria.nome.trim().length === 0) {
      throw new HttpException('O nome da categoria não pode ficar vazio!', HttpStatus.BAD_REQUEST);
    }
    return await this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.categoriaRepository.delete(id);
  }
}