const TestMongoModel = require('../models/TestMongoModel');

export interface ITest {
	user: string;
	email: string;
}

export class TestMongoService {
	public async run(params: any): Promise<ITest> {
		const testAll = await TestMongoModel.find();  
		return testAll;
	}
}