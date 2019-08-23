<?php 

class Config
{
	public $modulosUsuario;

	public function __construct()
	{
		// self::__verificaSessaoUsuario();
	}

	private function verificaReferencia()
	{
		$midiaId  = 0;
		$source   = '';
		$refTipo  = 0;
		$referrer = explode('.', @$_SERVER['HTTP_REFERER']);

		if(count($referrer) > 1 && $referrer[1] != 'promocaowizkidsmmf3')
		{
			if($referrer[1] == 'facebook')
			{
				$midiaId = 15;
				$source  = 'NLWZFBO';
			}
			else if($referrer[1] == 'google')
			{
				$midiaId = 16;
				$source  = 'NLWZGOO';
			}
			else if($referrer[1] == 'twitter' || @$_SERVER['HTTP_REFERER'] == 't.co')
			{
				$midiaId = 20;
				$source  = 'NLWZTWO';
			}
			else
			{
				$midiaId = 57;
				$source  = 'NLWZREF';
			}

			$refTipo = 1;
		}
		else
		{
			$midiaId = 46;
			$source  = 'NLWZDRT';

			$refTipo = 2;
		}

		return array($midiaId, $refTipo, $source);
	}

	public function verificaMidia()
	{
		$midiaId;
		$source;
		$midiaReferencia = $this->verificaReferencia();
		$midiaCookie     = @$_COOKIE['referer'];
		$sourceCookie    = @$_COOKIE['source'];

		$referer = explode('/', @$_SERVER['HTTP_REFERER']);

		if(@$_GET['mID'])
		{
			$midiaId = $_GET['mID'];
		}
		else if($midiaReferencia[1] == 1)
		{
			$midiaId = $midiaReferencia[0];			
		}
		else if($midiaCookie)
		{
			$midiaId = $midiaCookie;
		}
		else
		{
			$midiaId = 46;
		}

		if(@$_GET['source'])
		{
			$source = $_GET['source'];
		}
		else if($midiaReferencia[1] == 1)
		{
			$source = $midiaReferencia[2];			
		}
		else if($sourceCookie)
		{
			$source = $sourceCookie;
		}
		else
		{
			$source = 'NLWZDRT';
		}

		setcookie('referer', $midiaId, (time()+(1*24*3600)), '/');
		setcookie('source', $source, (time()+(1*24*3600)), '/');
	}
}