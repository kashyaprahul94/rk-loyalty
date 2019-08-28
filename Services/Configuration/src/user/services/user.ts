import { UserRepository, AddressRepository } from "../persistence";

export class UserService {
  private userRepo: UserRepository;
  private addressRepo: AddressRepository;

  constructor() {
    this.userRepo = new UserRepository();
    this.addressRepo = new AddressRepository();
  }

  public async getAll() {
    return this.userRepo
      .findAll()
      .populate(this.addressRepo.getSchemaDefinition().title)
      .exec();
  }
  public async create() {
    const address = await this.addressRepo.createOne({
      street: "Alexanderstrasse 5",
      postcode: 10197,
      metadata: {},
    });

    return this.userRepo.createOne({
      age: 24,
      name: "Doe",
      address: address._id,
      metadata: {
        createdBy: "RAHUL JI",
      },
    });
  }
}
