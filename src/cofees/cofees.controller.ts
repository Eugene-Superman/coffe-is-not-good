import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CofeesService } from './cofees.service';
import { CreateCofeeDto } from './dto/create-cofee.dto';
import { UpdateCofeeDto } from './dto/update-cofee.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from 'src/common/pipes/parse-int/parse-int.pipe';
import { Protocol } from 'src/common/decorators/protocol.decorator';

// @UsePipes(ValidationPipe)  All controller pipes using
@Controller('cofees')
export class CofeesController {
    constructor(private readonly cofeeService: CofeesService) {}

    @Public()
    // @UsePipes(ValidationPipe)   One method pipe using
    @Get()
    finddAll(
        @Query() paginationQueryDto: PaginationQueryDto,
        @Protocol('https') protocol: string,
    ) {
        console.log('protocol', protocol);
        return this.cofeeService.getAll(paginationQueryDto);
    }

    @Get(':id')
    getOneById(@Param('id', ParseIntPipe) id: number) {
        const cofee = this.cofeeService.findOne('' + id);
        if (!cofee) {
            throw new NotFoundException(`Coffe with id ${id} not found`);
        }
        return cofee;
    }

    // OR
    // @Get(':id')
    // getOneByName(@Param() params) {
    //     return `Coffee #${params.id} item!`;
    // }

    @Post()
    create(@Body() createCofeeDto: CreateCofeeDto) {
        return this.cofeeService.create(createCofeeDto);
    }

    //OR
    // @Post()
    // create(@Body('name') name: string, @Body('location') location: string) {
    //     return `My name is ${name}. I'm from ${location}!!!`;
    // }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body(ValidationPipe) updateCofeeDto: UpdateCofeeDto, // Example of param based pipe
    ) {
        return this.cofeeService.update(id, updateCofeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.cofeeService.remove(id);
    }
}
