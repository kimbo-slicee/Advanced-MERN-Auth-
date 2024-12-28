import { Check, X } from 'lucide-react';
const PasswordCriteria = ({password}) => {
        const criteria = [
            {label:"At least 6 characters ", pattern: password.length >= 6},
            {label:"At least one lowercase character", pattern: /[a-z]+/.test(password)},
            {label:"At least one uppercase character", pattern: /[A-Z]+/.test(password)},
            {label:"At least one digit", pattern: /\d+/.test(password)},
            {label:"At least one special character", pattern: /[!@#$%^&*]+/.test(password)},

        ]

    return (
        <div className="mt-2 space-y-1">
            {criteria.map((item, index) =>(
                <div key={index} className="flex items-center text-xs">
                    {(item.pattern)?(<Check className="size-4 text-green-500 mr-2 "/>):(<X className="size-4 text-gray-600 mr-2"/>)}
                    <span className={item.pattern?"text-green-500":"text-gray-400"}>{item.label}</span>
                </div>
            ))}
        </div>
    )
}
const passwordStrengthMeter = ({password}) => {
    const getStrength = (password) => {
      let strength = 0;
       if (password.length >= 6) strength++;
       if (password.match(/[a-z]/)) strength++;
       if (password.match(/[A-Z]/)) strength++;
       if (password.match(/\d/)) strength++;
       if (password.match(/[!@#$%^&*]/)) strength++;
       return strength;
    };
    const strength = getStrength(password);
    const getStrengthText =(strength)=>{
        switch (strength) {
            case 0:
                return "Weak";
            case 1:
                return "Fair";
            case 2:
                return "Good";
            case 3:
                return "Strong";
            case 4:
                return "Very Strong";
        }
    }
    getStrength(password);
    const getColors=(strength)=>{
        switch (strength) {
            case 0:
                return "bg-gray-600";
            case 1:
                return "bg-red-500";
            case 2:
                return "bg-yellow-500";
            case 3:
                return "bg-blue-500";
            case 4:
                return "bg-green-500";
            default:
                return "bg-green-500";
        }

    }
    return (
        <div className="mt-5">
            <div className="flex justify-between items-center mb-2  ">
                <span className="text-sm text-gray-400">Password strength</span>
                <span className="text-sm text-gray-400">{getStrengthText(getStrength(password))}</span>
            </div>
            <div className="flex space-x-1">
                {[...Array(4)].map((_, index)=>(
                       <div key={index} className={`h-1 w-1/4 rounded-full transition-colors duration-300 
                       ${index<strength?getColors(strength):"bg-gray-600" }`}>
                       </div>
                )
                )}
            </div>
            <PasswordCriteria password={password}/>
        </div>
    )
  
}
export default passwordStrengthMeter;