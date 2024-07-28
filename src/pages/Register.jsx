import { Button, Label, TextInput } from "flowbite-react";

const Register = () => {
    const handleSubmit=(e)=>{
        e.preventDefault();
        const email= e.target.email1.value;
        const password= e.target.email1.value;
        console.log(email)
    }
  return (
    <div className=" flex justify-center">
      <form onSubmit={handleSubmit} className="flex w-1/4 flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput id="password1" type="password" required />
        </div>
        
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Register;
