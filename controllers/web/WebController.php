<?php 

class WebController  extends Controller{
    
    public function home() {
        $this->render('public/home');
    }

    public function sobre() {
        echo "Sobre nossa empresa.";
    }


}   