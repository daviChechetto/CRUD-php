<?php
declare(strict_types=1);

namespace App\Middleware;

use Cake\Http\Response;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

/**
 * CORS Middleware para habilitar requisições Cross-Origin Resource Sharing (CORS)
 * vindas de outras origens/portas (por exemplo, http://localhost:3000).
 */
class CorsMiddleware implements MiddlewareInterface
{
    /**
     * @param \Psr\Http\Message\ServerRequestInterface $request A requisição.
     * @param \Psr\Http\Server\RequestHandlerInterface $handler O manipulador.
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $origin = $request->getHeaderLine('Origin');
        if (empty($origin)) {
            $origin = '*';
        }

        $corsHeaders = [
            'Access-Control-Allow-Origin' => $origin,
            'Access-Control-Allow-Methods' => 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers' => 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
            'Access-Control-Allow-Credentials' => 'true',
            'Access-Control-Max-Age' => '86400',
        ];

        // Se for uma requisição preflight (OPTIONS), responde imediatamente
        if (strtoupper($request->getMethod()) === 'OPTIONS') {
            $response = new Response(['status' => 200]);
            foreach ($corsHeaders as $header => $value) {
                $response = $response->withHeader($header, $value);
            }

            return $response;
        }

        $response = $handler->handle($request);

        foreach ($corsHeaders as $header => $value) {
            $response = $response->withHeader($header, $value);
        }

        return $response;
    }
}

