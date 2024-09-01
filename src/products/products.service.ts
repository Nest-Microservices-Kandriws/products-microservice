import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(ProductsService.name);
  private readonly whereNotDeleted = {
    deletedAt: null
  }
  onModuleInit() {
    this.$connect();
    this.logger.log('Prisma connected');
  }
  create(createProductDto: CreateProductDto) {
    try {
      return this.product.create({
        data: createProductDto
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const totalPages = await this.product.count({
      where: this.whereNotDeleted
    });
    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.product.findMany({
        take: limit,
        skip: (page - 1) * limit,
        where: this.whereNotDeleted
      }),
      meta: {
        totalPages: totalPages,
        page: page,
        lastPage: lastPage,
      }
    };
  }

  async findOne(id: number) {
    const product = await this.product.findFirst({
      where: {
        id,
        deletedAt: null
      }
    });

    if (!product) {
      throw new RpcException({
        message: 'Product not found',
        status: HttpStatus.BAD_REQUEST
      });
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    const { id: __, ...data } = updateProductDto;

    await this.findOne(id);

    return this.product.update({
      where: {
        id
      },
      data
    });
  }

  async remove(id: number) {

    await this.findOne(id);

    const product = await this.product.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date()
      }
    });

    return {
      data: product,
      message: 'Product deleted successfully'
    }
  }
}
