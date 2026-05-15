import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { ProdutoModule } from './produto/produto.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
        imports: [ConfigModule],
    }),
    CategoriaModule,
    ProdutoModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
