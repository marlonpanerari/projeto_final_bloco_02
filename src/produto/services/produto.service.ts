import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Produto } from '../entities/produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) { }

  async findAll(): Promise<Produto[]> {
    const produtos = await this.produtoRepository.find({
      relations: { categoria: true },
    });
    if (produtos.length === 0) {
      throw new HttpException('Nenhum produto cadastrado!', HttpStatus.NOT_FOUND);
    }
    return produtos;
  }

  async findById(id: number): Promise<Produto> {
    if (!id || id <= 0) {
      throw new HttpException('ID inválido!', HttpStatus.BAD_REQUEST);
    }

    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: { categoria: true },
    });
    if (!produto) {
      throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
    }
    return produto;
  }

  async findByNome(nome: string): Promise<Produto[]> {
    if (!nome || nome.trim().length === 0) {
      throw new HttpException('O termo de busca não pode estar vazio!', HttpStatus.BAD_REQUEST);
    }
    const produtos = await this.produtoRepository.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: { categoria: true },
    });
    if (produtos.length === 0) {
      throw new HttpException('Nenhum produto encontrado com esse nome!', HttpStatus.NOT_FOUND);
    }
    return produtos;
  }

  async create(produto: Produto): Promise<Produto> {
    if (!produto.nome || produto.nome.trim().length === 0) {
      throw new HttpException('O nome do produto é obrigatório!', HttpStatus.BAD_REQUEST);
    }
    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    if (!produto.id || produto.id <= 0) {
      throw new HttpException('O ID do produto é obrigatório para atualização!', HttpStatus.BAD_REQUEST);
    }
    await this.findById(produto.id);
    if (!produto.nome || produto.nome.trim().length === 0) {
      throw new HttpException('O nome do produto não pode ser vazio!', HttpStatus.BAD_REQUEST);
    }
    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.produtoRepository.delete(id);
  }
}