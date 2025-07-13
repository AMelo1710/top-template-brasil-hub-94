import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Home, Mail, AlertCircle } from "lucide-react";

const Page404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md mx-auto text-center px-6">
        {/* Ícone de erro */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Número 404 */}
        <h1 className="text-8xl font-bold text-gray-800 mb-4">404</h1>

        {/* Mensagem principal */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Ops! Página não encontrada
        </h2>

        {/* Descrição */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          O site não conseguiu encontrar essa página. 
          <br />
          Ela pode ter sido movida, deletada ou você digitou o endereço incorreto.
        </p>

        {/* Botões de ação */}
        <div className="space-y-4">
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
            <Link to="/" className="flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              Voltar para a Página Inicial
            </Link>
          </Button>

          <Button variant="outline" asChild className="w-full">
            <Link to="/contact" className="flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              Entre em contato com o suporte
            </Link>
          </Button>
        </div>

        {/* Informações adicionais */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Se você acredita que isso é um erro, entre em contato conosco.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page404; 